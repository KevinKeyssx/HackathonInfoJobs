export interface Root {
    offers: Offer[]
    aggregation: Aggregation
    navigation: Navigation
    search: Search
    overview: Overview
    metadata: Metadata
    segmentation: Segmentation
    companyLogos: CompanyLogos
    me: Me
    searchId: number
    eligibleForAutomaticAlertCreation: boolean
    trackingProperties: TrackingProperties
}

export interface Offer {
    code: string
    title: string
    description: string
    city: string
    link: string
    contractType: string
    salary?: Salary
    workday: string
    teleworking?: string
    publishedAt: string
    companyName: string
    companyLogo: string
    companyLink: string
    states: string[]
    upsellings: string[]
    executive: boolean
    selected: false | boolean; 
    match?: number | null
}

export interface Salary {
    range: Range
    period: string
    currency: string
    type: string
}

export interface Range {
    min: number
    max: number
}

export interface Aggregation {
    province: Province[]
    city: City[]
    teleworking: Teleworking[]
    category: Category[]
    education: Education[]
    workday: Workday[]
    contractType: ContractType[]
    segment: Segment[]
    country: Country[]
}

export interface Province {
    value: string
    label: string
    count: number
    order: number
    semanticLink: string
}

export interface City {
    value: string
    label: string
    count: number
    order: number
}

export interface Teleworking {
    value: string
    label: string
    count: number
    order: number
}

export interface Category {
    value: string
    label: string
    count: number
    order: number
    semanticLink: string
}

export interface Education {
    value: string
    label: string
    count: number
    order: number
}

export interface Workday {
    value: string
    label: string
    count: number
    order: number
}

export interface ContractType {
    value: string
    label: string
    count: number
    order: number
}

export interface Segment {
    value: string
    label: string
    count: number
    order: number
}

export interface Country {
    value: string
    label: string
    count: number
    order: number
}

export interface Navigation {
    self: number
    next: number
    pages: number[]
    totalPages: number
    totalElements: number
    sortedBy: string
    availableSortingMethods: string[]
}

export interface Search {
    keyword: Keyword
    countryIds: any[]
    provinceIds: any[]
    cityIds: any[]
    teleworkingIds: any[]
    categoryIds: any[]
    subcategoryIds: any[]
    educationIds: any[]
    workdayIds: any[]
    contractTypeIds: any[]
    segmentId: any
    salary: any
    experience: any
    sinceDate: string
    onlyForeignCountry: boolean
    sortBy: string
}

export interface Keyword {
    value: string
    normalizedJobTitleIds: any[]
}

export interface Overview {
    totalElements: number
    title: string
    keyword: Keyword2
    provinces: any[]
    cities: any[]
}

export interface Keyword2 {
    value: string
    link: string
    title: string
}

export interface Metadata {
    title: string
    metaKeywords: string
    metaDescription: string
    canonicalUrl: string
    activeExperiments: any[]
}

export interface Segmentation {
    utagParams: UtagParams
}

export interface UtagParams {
    es_sch_ad_province: string[]
    es_sch_ad_province_id: number[]
    es_sch_filter_autocomplete: number
    es_sch_search_id: number
    es_sch_search_results_number: number
    es_sch_search_terms: string
    es_sch_user_age: number
    es_sch_user_city: string
    es_sch_user_country: string
    es_sch_user_country_id: number
    es_sch_user_currently_studying: number
    es_sch_user_days_last_use_number: number
    es_sch_user_freelance: number
    es_sch_user_genre: string
    es_sch_user_genre_id: number
    es_sch_user_id: number
    es_sch_user_last_application_date: string
    es_sch_user_last_experience: string
    es_sch_user_last_update_date: string
    es_sch_user_optin: number
    es_sch_user_province: string
    es_sch_user_province_id: number
    es_sch_user_register_complete_date: string
    es_sch_user_register_date: string
    es_sch_user_role: string
    es_sch_user_role_id: number
    es_sch_user_segment: string
    es_sch_user_segment_id: number
    es_sch_user_work_experience: string
    es_sch_user_work_experience_id: number
    offer_search_page: number
    offer_search_page_limit: number
    pb_adv_opt: number
    region_level2_id: number[]
    search_terms: string
    user_age: number
    user_birthdate: string
    user_car_owner: number
    user_currently_studying: number
    user_freelance: number
    user_genre: number
    user_geo_city: string
    user_geo_country: number
    user_geo_region: number
    user_id: number
    user_role_id: string
    user_segment: number
    user_work_experience: number
    ads_name_page: string
    seccion: string
    site: string
    is_msite: string
    es_sch_ads_name_page: string
    es_sch_event_name: string
    es_sch_adobe_is_enabled: string
}

export interface CompanyLogos {
    referer: string
    segmentation: Segmentation2
}

export interface Segmentation2 {
    keyword: string[]
}

export interface Me {
    login: string
    cvCode: string
    name: string
    settings: Settings
}

export interface Settings {
    signupRedirectPath: any
}

export interface TrackingProperties {
    page_type: string
    channel: string
    offer_origin: string
    vertical: string
    section: string
    platform: string
    category_level1: string
    search_with_autocomplete: boolean
    executive: boolean
    site: string
    province: string
    list_result_num: number
    page_name: string
    event_name: string
    keyword: string
    international: boolean
    segment_event_already_tracked: boolean
    order: string
}
