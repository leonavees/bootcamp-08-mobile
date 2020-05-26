import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
    const [opened, setOpened] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
        [date]
    );

    function handleSelectDate(e, selectedDate) {
        const currentDate = selectedDate || date;

        setOpened(Platform.OS === 'ios');

        onChange(currentDate);
    }

    return (
        <Container>
            <DateButton onPress={() => setOpened(!opened)}>
                <Icon name="event" size={20} color="#fff" />
                <DateText>{dateFormatted}</DateText>
            </DateButton>

            {opened && (
                <DateTimePicker
                    onChange={handleSelectDate}
                    minuteInterval={60}
                    minimumDate={new Date()}
                    mode="date"
                    value={date}
                    display="spinner"
                    locale="pt"
                />
            )}
        </Container>
    );
}
