import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increaseCounter, decreaseCounter } from '../actions'
import { bindActionCreators } from "redux";

const mapStateToProps = (state, ownProps) => {
    return {
        count: state.counter.count
    };
}

const requiredActions = { increaseCounter, decreaseCounter };

export default connect(mapStateToProps, requiredActions)(Counter); 
