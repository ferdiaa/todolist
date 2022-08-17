import styles from './layout.module.css';
import PropTypes from 'prop-types';
export default function Layout({ children }){
    return(
        <div className={styles.layout}>
            <nav data-cy="header">
                <div data-cy="header-background" className={styles.headerBakcgorund}>
                    <h1 data-cy="header-title">TO DO LIST APP</h1>
                </div>
            </nav>
            <main>
                { children }
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
}