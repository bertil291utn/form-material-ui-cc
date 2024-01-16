import { Range } from '@/interfaces/Range'
import { RangeCreateInput, RangoForm } from '@/interfaces/RangoForm'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface RangeState {
  rangos: Array<Range>
}


const initialState: RangeState = {
  rangos: []

}

export const RangeFormSlice = createSlice({
  name: 'rangeForm',
  initialState,
  reducers: {
    initialSetRangeForm: (store, { payload }: PayloadAction<Array<Range>>) => {
      store.rangos = [...payload]
    },
  },
})

export const { initialSetRangeForm } = RangeFormSlice.actions

export default RangeFormSlice.reducer