export interface PortfolioItem {
  title: string
  slug: string
  tags: Array<{ id: string; description: string; title: string }>
  summary: string
  thumbnail: string
  footers: {
    left: { icon: StatsIconType; text: string } | undefined
    right: { icon: StatsIconType; text: string } | undefined
  }
  link: Link | null
}

export interface Link {
  type: 'internal' | 'external'
  path: string
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

export interface BlogPost {
  slug: string
  url: string
  created: Date
  published: Date
  title: string
  body: string | undefined
  summary: string
  featured_image: string
  seo_title: string
  author: {
    first_name: string
    last_name: string
    profile_image: string
  }
  tags: { slug: string; name: string }[]
}
