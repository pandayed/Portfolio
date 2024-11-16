import axios from "axios";

const APIS = {
    // https://github.com/w3slley/bookcover-api
    BOOK_COVER: "https://bookcover.longitood.com/bookcover/",
}

export const getBookCoverUrl = (successCallback, errorCallback, isbn) => {
    const bookCoverUrl = `${APIS.BOOK_COVER}${isbn}`;

    axios.get(bookCoverUrl)
    .then(response => {
        successCallback(response)
    })
    .catch(error => {
        errorCallback(error)
    })

}

export const getImageFromUrl = (successCallback, errorCallback, imageUrl) => {
    
}