export interface CodesType {
    search: string
    years?: string//Array<string>
    season_code?: string//Array<string>
    genres?: string//Array<string>
    filter?: string//Array<string>
    limit?: number
    after?: number
  }
  
  export interface AdvancedSearchType {
    query: string
    filter?: string
    remove?: string
    include?: string
    description_type?: string
    playlist_type?: string
    limit?: number
    after?: number
    order_by?: string
    sort_direction?: number
  }
  
  export interface CodesType {
    reqCode: string
    resCode: string
  }