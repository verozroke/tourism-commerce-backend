import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateTourInfoDto, UpdateTourInfoDto } from './dto/tour-info.dto';
import { log } from 'console';

export type DurationOption = 'Upto 1 Hour' | '1 to 4 Hours' | '4 Hours to 1 Day' | '1 to 3 Days' | '3 Days or More'
export type AgeGroupOption = '1 & Up' | '3 & Up' | '7 & Up' | '13 & Up' | '18 & Up'
export type TagOption = 'Child Friendly' | 'Taking extra precautions' | 'Away from the chaos' | 'Epic Challenges' | 'Virtual Experiences'
export type SpecialOption = 'Discounted deals' | 'Free Cancellations' | 'Private Groups' | 'New on Entrada' | 'Entrada Specials'
export type SortByOption = 'Rating' | 'Relevance' | 'Price' | 'Title'

type SortByMapping = {
  [key in SortByOption]: string;
};

const sortByMapping: SortByMapping = {
  Rating: 'rate',
  Relevance: 'rateAmount',
  Price: 'price',
  Title: 'title'
};

type queryParams = {
  durations: DurationOption[]
  ageGroups: AgeGroupOption[]
  tags: TagOption[]
  sortBy: SortByOption
  desc: string
  dateRange: [from: string, to: string]
  priceRange: [minPrice: string, maxPrice: string]
  specials: SpecialOption[]
  limit: string,
  page: string
}


export type TourLengthQueryParams = {
  priceRange: [minPrice: string, maxPrice: string]
  durations: DurationOption[]
  ageGroups: AgeGroupOption[]
  dateRange: [from: string, to: string]
  specials: SpecialOption[]
  tags: TagOption[]
}

@Injectable()
export class TourInfosService {

  constructor(private prisma: PrismaService) { }


  async getTourLength(query: TourLengthQueryParams, req: Request, res: Response) {
    const {
      durations,
      ageGroups,
      specials,
      tags,
      dateRange,
      priceRange,
    } = query

    const tourInfosLength = await this.prisma.tourInfo.count({
      where: {
        date: {
          gte: dateRange[0] ? new Date(dateRange[0]) : new Date('1970-01-01'),
          lte: dateRange[1] ? new Date(dateRange[1]) : new Date(Date.now())
        },
        price: {
          gte: priceRange ? Number.parseInt(priceRange[0]) : 0,
          lte: priceRange ? Number.parseInt(priceRange[1]) : 7500,
        },
        duration: {
          name: {
            in: durations
          }
        },
        ageGroup: {
          name: {
            in: ageGroups
          }
        },
        specials: {
          some: {
            name: {
              in: specials
            }
          }
        },
        tags: {
          some: {
            name: {
              in: tags
            }
          }
        }
      },
    })


    return res.send({ length: tourInfosLength })


  }

  async searchTourInfos(q: string, req: Request, res: Response) {

    const searchedTourInfos = await this.prisma.tourInfo.findMany({
      where: {
        title: {
          contains: q,
          mode: 'insensitive'
        }
      },
      take: 3
    })

    return res.send(searchedTourInfos)
  }
  async getTourInfos(query: queryParams, req: Request, res: Response) {
    const {
      durations,
      ageGroups,
      specials,
      tags,
      dateRange,
      desc,
      priceRange,
      sortBy,
      limit,
      page,
    } = query

    const ageGroupMapped = ageGroups ? ageGroups.map(ageGroup => {
      return ageGroup + '& Up'
    }) : ageGroups

    const tourInfos = await this.prisma.tourInfo.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        date: {
          gte: dateRange[0] ? new Date(dateRange[0]) : new Date('1970-01-01'),
          lte: dateRange[1] ? new Date(dateRange[1]) : new Date(Date.now())
        },
        price: {
          gte: priceRange ? Number.parseInt(priceRange[0]) : 0,
          lte: priceRange ? Number.parseInt(priceRange[1]) : 7500,
        },
        duration: {
          name: {
            in: durations
          }
        },
        ageGroup: {
          name: {
            in: ageGroupMapped
          }
        },
        specials: {
          some: {
            name: {
              in: specials
            }
          }
        },
        tags: {
          some: {
            name: {
              in: tags
            }
          }
        }
      },
      orderBy: {
        [sortByMapping[sortBy]]: desc === 'true' ? 'desc' : 'asc'
      },
      include: {
        duration: true,
        ageGroup: true,
        specials: true,
        tags: true
      },
    })

    return res.send(tourInfos)
  }

  async getTopDestinations(req: Request, res: Response) {
    const topDestinations = await this.prisma.tourInfo.findMany({
      take: 9,
      orderBy: {
        rate: 'desc'
      }
    })

    return res.send(topDestinations)
  }

  async getFeaturedTourInfos(req: Request, res: Response) {

    const featuredTours = await this.prisma.tourInfo.findMany({
      where: {
        isFeatured: "true",
      },
      include: {
        ageGroup: true,
        duration: true,
      },
      take: 4,
    })

    return res.send(featuredTours)
  }

  async getTourInfoById(id: string, req: Request, res: Response) {
    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      },

    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const tourInfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      },
      include: {
        duration: true
      }
    })
    return res.send(tourInfo)
  }

  async createTourInfo(dto: CreateTourInfoDto, req: Request, res: Response) {
    const { title } = dto

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        title,
      }
    })

    if (foundTourUnfo) {
      throw new BadRequestException('Existing tour')
    }

    const tourInfo = await this.prisma.tourInfo.create({
      data: dto,
      include: {
        ageGroup: true,
        duration: true,
      },
    })

    return res.send(tourInfo)

  }

  async updateTourInfo(id: string, dto: UpdateTourInfoDto, req: Request, res: Response) {

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const updatedTourInfo = await this.prisma.tourInfo.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedTourInfo))
  }

  async deleteTourInfo(id: string, req: Request, res: Response) {

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const deletedTourInfo = await this.prisma.tourInfo.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedTourInfo))

  }


}
