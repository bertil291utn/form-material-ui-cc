export interface Range {
  id: string
  maximum: number
  minimum: number
  status: boolean
  samplingRanges: Array<SamplingRange>
}

export interface SamplingRange {
  id: string
  numberSamples: number
  sampling: Sampling
}

export interface Sampling {
  id: string
  name: string
}
