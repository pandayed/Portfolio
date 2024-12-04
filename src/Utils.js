import React from "react";

export function getFormattedDate(date) {
    date = new Date(date)

    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}