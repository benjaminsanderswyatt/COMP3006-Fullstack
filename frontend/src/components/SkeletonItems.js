const SkeletonItems = () => {

    return (
        <div style={styles.skeletonItem}>
            <div style={styles.skeletonImage}></div>
            <div style={styles.skeletonText}></div>
            <div style={styles.skeletonText}></div>
        </div>
    );
};

const styles = {
    skeletonItem: {
        border: '1px solid #dddddd',
        borderRadius: '8px',
        padding: '15px',
        width: '200px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f0f0f0',
    },
    skeletonImage: {
        width: '100%',
        height: '150px',
        borderRadius: '8px',
        backgroundColor: '#e0e0e0',
    },
    skeletonText: {
        height: '15px',
        margin: '10px 0',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
    },
};

export default SkeletonItems;