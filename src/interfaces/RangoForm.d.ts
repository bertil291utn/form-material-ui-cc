export interface RangoForm {
  rango: Array<RangeCreateInput>
}

interface RangeCreateInput {
  id: string
  minimum: number;
  maximum: number;
  samplings?: Array<SamplingCreateInput>;
}


interface SamplingCreateInput {
  id: string;
  name: string;
  samplingRange?: SamplingRangeCreateInput;
}

interface SamplingRangeCreateInput {
  numberSamples?: number;
}

