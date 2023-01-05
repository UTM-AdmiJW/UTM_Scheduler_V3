import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import type { RootState } from "../../redux/store";

import { actions } from "../../redux/studentSlice";



export function useStudentRedux() {
    const dispatch = useDispatch();
    const studentState = useSelector((state: RootState) => state.student);
    const studentActions = bindActionCreators(actions, dispatch);
    return { studentState, studentActions };
}