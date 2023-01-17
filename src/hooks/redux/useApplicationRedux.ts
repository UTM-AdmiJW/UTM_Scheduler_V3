import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import type { RootState } from "../../redux/store";

import { actions } from "../../redux/applicationSlice";



export function useApplicationRedux() {
    const dispatch = useDispatch();
    const applicationState = useSelector((state: RootState) => state.application);
    const applicationActions = bindActionCreators(actions, dispatch);
    return { applicationState, applicationActions };
}