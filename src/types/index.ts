export interface PortfolioItem {
  name: string
  alias: string
  tags: Array<string>
  summary: string
  thumbnail: string
  footers: {
    left: { icon: StatsIconType; text: string } | undefined
    right: { icon: StatsIconType; text: string } | undefined
  }
  link: { type: 'internal' | 'external'; path: string } | null
}

export interface ProjectItem extends PortfolioItem {
  skills: { skill: string; level: 1 | 2 | 3 }[]
}

export enum StatsIconType {
  'upvotes' = 'upvotes',
  'shares' = 'shares',
  'views' = 'views',
  'users' = 'users'
}
