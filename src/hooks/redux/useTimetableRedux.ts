import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import type { RootState } from "../../redux/store";

import { actions } from "../../redux/timetableSlice";



export function useTimetableRedux() {
    const dispatch = useDispatch();
    const timetableState = useSelector((state: RootState) => state.timetable);
    const timetableActions = bindActionCreators(actions, dispatch);
    return { timetableState, timetableActions };
}