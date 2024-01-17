export interface Range {
  id: string
  maximum: string
  minimum: string
  status: boolean
  samplingRanges: Array<SamplingRange>
}

export interface SamplingRange {
  id: string
  numberSamples: string
  sampling: Sampling
}

export interface Sampling {
  id: string
  name: string
}
