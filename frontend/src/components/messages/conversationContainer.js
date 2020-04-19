import { connect } from "react-redux";

import { Conversations } from "./conversations";

const msp = (state) => ({
  currentUserId: state.session.user.id,
});

const mdp = (dispatch) => ({});

export default connect(msp, mdp)(Conversations);
