import axios from 'axios';

const APIS = {
    // https://github.com/w3slley/bookcover-api
    BOOK_COVER: 'https://bookcover.longitood.com/bookcover/',
} as const;

export interface BookCoverResponse {
    url: string;
}

export const getBookCoverUrl = async (isbn: string): Promise<string> => {
    const response = await axios.get<BookCoverResponse>(`${APIS.BOOK_COVER}${isbn}`);

    return response.data.url;
};
