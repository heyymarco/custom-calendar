import styles   from './styles.module.scss'
import {
    default as React,
    useState,
    useEffect,
}               from 'react'
import {
    createPortal,
}               from 'react-dom'
import cn       from 'classnames'



const monthLetters = Object.fromEntries(
    new Array(12).fill(null).map((value, index) =>
        [index + 1, new Date(2000, index, 1).toLocaleString('default', { month: 'narrow' })]
    )
);
const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export const CustomCalendar = (props) => {
    // props:
    const {
        from,
        to,
        data = [],
        mapPrecision = 10,
    } = props;
    
    
    
    const fromYear    = from.getFullYear();
    const toYear      = to.getFullYear();
    const yearsCount  = toYear - fromYear + 1;
    
    const fromMonth   = from.getMonth();
    const toMonth     = to.getMonth();
    const monthsCount = (toMonth - fromMonth + 1)
    + ((yearsCount - 1) * 12)
    ;
    
    
    
    const [portalContainer, setPortalContainer] = useState(null);
    useEffect(() => {
        const portalContainerElm = document.createElement('div');
        portalContainerElm.classList.add(styles.tooltipPortal);
        document.body.appendChild(portalContainerElm);
        setPortalContainer(portalContainerElm);
        
        return () => {
            portalContainerElm.parentElement?.removeChild?.(portalContainerElm);
        };
    }, [setPortalContainer]);
    const [showTooltip, setShowTooltip] = useState(undefined);
    const [tooltipPos, setTooltipPos] = useState({});
    
    
    
    // jsx:
    return (
        <>
            <div className={styles.calendar} style={{
                // @ts-ignore
                '--cldr-mapPrecision': mapPrecision,
            }}>
                <div className={styles.years}>
                    {new Array(yearsCount).fill(null).map((value, index) =>
                        <div key={index}>
                            {fromYear + index}
                        </div>
                    )}
                </div>
                <div className={styles.monthGrid} style={{
                    // @ts-ignore
                    '--cldr-monthCount': monthsCount,
                }}>
                    <div className={styles.monthCells}>
                        {new Array(monthsCount).fill(null).map((value, index) =>
                            <div className={cn(styles.monthCell, styles.monthCellGrid)} key={index}></div>
                        )}
                    </div>
                    <div className={styles.monthLabels}>
                        {new Array(monthsCount).fill(null).map((value, index) =>
                            <div className={cn(styles.monthCell, styles.monthLabel)} key={index}>
                                {monthLetters[((fromMonth + index) % 12) + 1]}
                            </div>
                        )}
                    </div>
                    <div className={styles.monthGraphs}>
                        {data.map(({from: localFrom, to: localTo, name}, index) => {
                            const relativeFromColumn = (
                                (localFrom.getFullYear() * 12 * mapPrecision) + (localFrom.getMonth() * mapPrecision) + Math.round((localFrom.getDate() - 1) / ( getMonthDays(localFrom) - 1) * mapPrecision)
                                -
                                (from.getFullYear()      * 12 * mapPrecision) + (from.getMonth()      * mapPrecision) + Math.round((from.getDate()      - 1) / (getMonthDays(from)       - 1) * mapPrecision)
                            );
                            const relativeToColumn = (
                                (localTo.getFullYear()   * 12 * mapPrecision) + (localTo.getMonth()   * mapPrecision) + Math.round((localTo.getDate()   - 1) / (getMonthDays(localTo)    - 1) * mapPrecision)
                                -
                                (from.getFullYear()      * 12 * mapPrecision) + (from.getMonth()      * mapPrecision) + Math.round((from.getDate()      - 1) / (getMonthDays(from)       - 1) * mapPrecision)
                            );
                            const relativeToSpan = (
                                relativeToColumn - relativeFromColumn
                            );
                            // jsx:
                            return (
                                <div key={index} className={styles.monthRow}>
                                    <div className={styles.monthChart}
                                        style={{
                                            // @ts-ignore
                                            '--cldr-chartFrom' : relativeFromColumn + 1,
                                            // @ts-ignore
                                            '--cldr-chartSpan' : Math.max(relativeToSpan, 1),
                                        }}
                                        onMouseEnter={(event) => {
                                            setShowTooltip(
                                                <p>
                                                    from {localFrom.toLocaleDateString()} to {localTo.toLocaleDateString()}
                                                </p>
                                            );
                                            const {
                                                left, right,
                                                top,
                                            } = event.currentTarget.getBoundingClientRect();
                                            setTooltipPos({
                                                left : `${(left + right) / 2}px`,
                                                top : `${top}px`,
                                            });
                                        }}
                                        onMouseLeave={() => {
                                            setShowTooltip(undefined);
                                        }}
                                    >
                                        {name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {!!portalContainer && createPortal(
                !!showTooltip && <div className={cn(styles.tooltip)} style={tooltipPos}>
                    {showTooltip}
                </div>
            , portalContainer)}
        </>
    );
}