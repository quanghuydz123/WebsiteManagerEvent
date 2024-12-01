import { createSlice } from "@reduxjs/toolkit";
import { RoleModel } from "../../models/RoleModel";

export interface constantState {
   idShowTime:string,
   idEvent:string

}

const initialState: constantState = {
    idShowTime:'',
    idEvent:''
}

const constantSlice = createSlice({
    name: 'constant',
    initialState: {
        constantData: initialState
    },
    reducers: {
        updateIdEventAndIdShowTime: (state, action) => {
            const {idEvent,idShowTime} = action.payload
            state.constantData.idEvent = idEvent;
            state.constantData.idShowTime = idShowTime;

        },
       
    }
});

export const constantReducer = constantSlice.reducer;
export const {updateIdEventAndIdShowTime} = constantSlice.actions;
// export const constantSelector = (state: any) => state.constantReducer.constantData;
