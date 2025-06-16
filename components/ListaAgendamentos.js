import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem('agendamentos');
      const lista = dados ? JSON.parse(dados) : [];
      setAgendamentos(lista);
    };
    carregar();
  }, []);

  return (
    <ScrollView>
      {agendamentos.map((item, index) => (
        <View key={index}>
          <Text>Nome: {item.nome}</Text>
          <Text>Data: {item.data}</Text>
          <Text>Hora: {item.hora}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>--------------------</Text>
        </View>
      ))}
    </ScrollView>
  );
}
