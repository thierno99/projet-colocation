import { MAKE_ANNOUNCE, MAKE_ANNOUNCE_FAIL, MAKE_ANNOUNCE_RESET, MAKE_ANNOUNCE_SUCCESS } from "../../constants/Announce";

export const advertiseAccommodationReducer = (
    state = { loading: true, products: [] },
    action: { type: any; payload: any; }
) => {
    switch (action.type) {
        case MAKE_ANNOUNCE:
          return { loading: true };
        case MAKE_ANNOUNCE_SUCCESS:
          return { loading: false, success: true };
        case MAKE_ANNOUNCE_FAIL:
          return { loading: false, error: action.payload };
        case MAKE_ANNOUNCE_RESET:
          return {};
        default:
          return state;
    }
};