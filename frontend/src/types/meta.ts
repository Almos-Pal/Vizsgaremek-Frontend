// Type for the meta object
export interface PaginationMeta {
    currentPage: number;    
    itemsPerPage: number;  
    totalItems: number;    
    totalPages: number;     
  }
  

  
  export interface PaginatedResponse<T> {
    items: T[];           
    meta: PaginationMeta;
  }
  