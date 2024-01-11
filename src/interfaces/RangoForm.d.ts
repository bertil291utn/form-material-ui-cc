export interface RangoForm {
  rangos: Array<RangeCreateInput>
}

interface RangeCreateInput {
  id: string
  minimum: string;
  maximum: string;
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

