import styles from './styles.module.scss'
import cn from 'classnames'

const monthLetters = Object.fromEntries(
    new Array(12).fill(null).map((value, index) =>
        [index + 1, new Date(2000, index, 1).toLocaleString('default', { month: 'narrow' })]
    )
);
console.log(monthLetters)

export interface Task {
    from : Date
    to   : Date
    name : string
}
export interface CustomCalendarProps {
    from  : Date
    to    : Date
    data ?: Task[]
}
export const CustomCalendar = (props: CustomCalendarProps): JSX.Element => {
    // props:
    const {
        from,
        to,
        data = [],
    } = props;
    
    
    
    const fromYear    = from.getFullYear();
    const toYear      = to.getFullYear();
    const yearsCount  = toYear - fromYear + 1;
    
    const fromMonth   = from.getMonth();
    const toMonth     = to.getMonth();
    const monthsCount = (toMonth - fromMonth + 1)
    + ((yearsCount - 1) * 12)
    ;
    
    
    // jsx:
    return (
        <div className={styles.calendar}>
            <div className={styles.years}>
                {new Array(yearsCount).fill(null).map((value, index) =>
                    <div key={index}>
                        {fromYear + index}
                    </div>
                )}
            </div>
            <div className={styles.monthGrid} style={{
                // @ts-ignore
                '--monthCount': `${monthsCount}`
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
                    {data.map((datum, index) => {
                        // jsx:
                        return (
                            <div className={styles.monthRow}>
                                <div className={styles.monthChart}>test</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}