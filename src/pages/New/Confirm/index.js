import React, { useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
    const provider = navigation.getParam('provider');
    const time = navigation.getParam('time');

    const dateFormatted = useMemo(
        () => formatRelative(parseISO(time), new Date(), { locale: pt }),
        [time]
    );

    async function handleAddAppointment() {
        try {
            await api.post('/appointments', {
                provider_id: provider.id,
                date: time,
            });

            navigation.navigate('Dashboard');

            Alert.alert('Sucesso', 'Agendamento marcado com sucesso');
        } catch (err) {
            Alert.alert(
                'Erro',
                'Erro inesperado ao tentar marcar um agendamento'
            );
        }
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? provider.avatar.url.replace(
                                  'localhost',
                                  '10.0.2.2'
                              )
                            : `https://api.adorable.io/avatars/50/${provider.name.trim()}.png`,
                    }}
                />

                <Name>{provider.name}</Name>

                <Time>{dateFormatted}</Time>

                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar agendamento
                </SubmitButton>
            </Container>
        </Background>
    );
}

Confirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar agendamento',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});
