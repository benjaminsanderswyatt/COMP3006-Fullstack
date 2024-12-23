import React from 'react';
import StockButton from '../components/StockButton';
import RemoveButton from '../components/RemoveButton';

const IncDecRemove = ({ product, onRemove, onInc, onDec }) => (
    <div style={styles.holder}>
        <StockButton product={product} onInc={onInc} onDec={onDec} />
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