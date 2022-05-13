export interface Iphoto {
    alt_description: string | null
    blur_hash: string
    categories: [] | string[]
    color: string
    created_at: string
    current_user_collections: []
    description: null | string
    height: number
    id: string
    liked_by_user: boolean
    likes: number
    links: { self: string, html: string, download: string, download_location: string }
    promoted_at: null | string
    sponsorship: { impression_urls: Array<string>, tagline: string, tagline_url: string, sponsor: any }
    topic_submissions: {}
    updated_at: string
    urls: { raw: string, full: string, regular: string, small: string, thumb: string }
    user: {
        accepted_tos: boolean
        bio: string
        first_name: string
        for_hire: boolean
        id: string
        instagram_username: null | string
        last_name: null | string
        links: { self: string, html: string, photos: string, likes: string, portfolio: string }
        location: any
        name: string
        portfolio_url: string
        profile_image: { small: string, medium: string, large: string }
        social: { instagram_username: null | string, portfolio_url: string, twitter_username: string, paypal_email: null | string }
        total_collections: number
        total_likes: number
        total_photos: number
        twitter_username: string
        updated_at: string
        username: string
    }
    width: number
}

export interface IcurrentPhoto extends Iphoto {
    PhotoId: number
}