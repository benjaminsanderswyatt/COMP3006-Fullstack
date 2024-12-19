import React from 'react';
import StockButton from '../components/StockButton';
import RemoveButton from '../components/RemoveButton';

const IncDecRemove = ({ product }) => (
    <div style={styles.holder}>
        <StockButton product={product} />
        <RemoveButton product={product} />
    </div>
);

const styles = {
    holder: {
        width: '100%',
        padding: '4px',
    }
}

export default IncDecRemove;