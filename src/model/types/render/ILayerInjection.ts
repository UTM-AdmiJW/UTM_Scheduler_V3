
import React from "react"

/**
 * Injects additional konva elements into the standard rendering procedures in each konva layer.
 * There are 2 types: pre and post.
 * 
 * - pre konva elements are added before the normal rendering of specific layer
 * - post konva elements are added after the normal rendering of specific layer
 */
export interface ILayerInjection {
    pre: React.ReactNode[],
    post: React.ReactNode[],
}