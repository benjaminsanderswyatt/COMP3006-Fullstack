import React from 'react';
import RemoveButton from '../components/RemoveButton';
import SetStockButton from '../components/SetStockButton';

const IncDecRemove = ({ product, onRemove, onSet }) => (
    <div style={styles.holder}>
        <SetStockButton product={product} onSet={onSet}/>
        <RemoveButton product={product} onRemove={onRemove}/>
    </div>
);

const styles = {
    holder: {
        width: '100%',
        padding: '4px',
    }
}

export default IncDecRemove;