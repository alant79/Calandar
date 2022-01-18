import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

export default function Calendar(props) {


    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',]
    const WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const NDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const [activeDate, setActiveDate] = useState(new Date())
    const [matrix, setMatrix] = useState([])
    const [currentMonth, setCurrentMonth] = useState(activeDate.getMonth())
    const [currentYear, setCurrentYear] = useState(activeDate.getFullYear())
    const [currentDate, setCurrentDate] = useState(activeDate.getDate())

    useEffect(() => {
        const matrix = []
        matrix[0] = WEEKDAYS

        const firstDay = new Date(currentYear, currentMonth, 1).getDay()-1;
        const maxDays = NDAYS[currentMonth];
        if (currentMonth == 1) { // February
            if ((currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0) {
                maxDays += 1;
            }
        }
        let counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
            }
        }
        setMatrix(matrix)
    }, [activeDate])

    const handlerOnPress = (item) => {
        if (!item.match && item != -1) {
            const newDate = new Date(activeDate.setDate(item))
            setActiveDate(newDate)
            setCurrentDate(newDate.getDate())
        }
    };

    const changeMonth = (n) => {
        const newDate = new Date(currentYear, currentMonth, currentDate)
        newDate.setMonth(
            activeDate.getMonth() + n
        )   
        setActiveDate(newDate)
        setCurrentMonth(newDate.getMonth())
        setCurrentYear(newDate.getFullYear())
        setCurrentDate(newDate.getDate())
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    {MONTHS[currentMonth]} &nbsp;
                    {currentYear}
                </Text>
            </View>
            <View>
                {matrix.map((row, rowIndex) => {
                    let rowItems = row.map((item, colIndex) => {
                        return (
                            <Text key={rowIndex.toString()+colIndex.toString()}
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    // Highlight header
                                    backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                                    // Highlight Sundays
                                    color: colIndex == 5 || colIndex == 6 ? '#a00' : '#000',
                                    // Highlight current date
                                    fontWeight: item == currentDate ? 'bold' : ''
                                }}
                                onPress={() => handlerOnPress(item)}>
                                {item != -1 ? item : ''}
                            </Text>
                        )
                    })

                    return (<View style={styles.matrix} key={rowIndex.toString()}>
                        {rowItems}
                    </View>)
                })}
            </View>
            <View style={styles.buttons}>
                <Button title="Previous"
                    onPress={() => changeMonth(-1)} />
                <Button title="Next"
                    onPress={() => changeMonth(+1)} />
            </View>

        </View >
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
    },
    matrix: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        margin: 20
    },

})