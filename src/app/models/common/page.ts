export interface Page<T>{
    content: Array<T>;
    size: number;
    number: number;
    totalElements: number;
    firts: number;
}