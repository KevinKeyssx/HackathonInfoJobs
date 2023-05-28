export interface InfoJobsResponse {
    data:   Data;
    status: number;
}

export interface Data {
    currentPage:             number;
    pageSize:                number;
    totalResults:            number;
    currentResults:          number;
    totalPages:              number;
    availableSortingMethods: string[];
    sortBy:                  string;
    items:                   Item[];
    dataLayer:               DataLayer;
    offers:                  Item[];
}

export interface DataLayer {
    offer_search_page:       string;
    offer_search_page_limit: string;
    search_category:         string;
    region_level2_id:        string;
}

export interface Item {
    id:                string;
    title:             string;
    province:          Category;
    city:              string;
    link:              string;
    category:          Category;
    contractType:      Category;
    subcategory:       Category;
    salaryMin:         Category;
    salaryMax:         Category;
    salaryPeriod:      Category;
    experienceMin:     Category;
    workDay:           Category;
    study:             Category;
    published:         Date;
    updated:           Date;
    author:            Author;
    requirementMin:    string;
    bold:              boolean;
    applications:      string;
    subSegment:        number;
    executive:         boolean;
    salaryDescription: string;
    urgent:            boolean;
    color:             boolean;
    teleworking:       Category;

    selected: false | boolean;
    match: number | null;
}

export interface Author {
    id:                    string;
    name:                  string;
    uri:                   string;
    corporateResponsive:   boolean;
    showCorporativeHeader: boolean;
    logoUrl?:              string;
}

export interface Category {
    id:    number;
    value: string;
}
