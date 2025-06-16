import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendamentoForm() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('');

  const salvar = async () => {
    const novoAgendamento = { nome, data, hora, tipo };
    const dados = await AsyncStorage.getItem('agendamentos');
    const agendamentos = dados ? JSON.parse(dados) : [];
    agendamentos.push(novoAgendamento);
    await AsyncStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    alert('Agendamento salvo!');
    setNome('');
    setData('');
    setHora('');
    setTipo('');
  };

  return (
    <View>
      <Text>Nome da Cliente:</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text>Data:</Text>
      <TextInput value={data} onChangeText={setData} />
      <Text>Hora:</Text>
      <TextInput value={hora} onChangeText={setHora} />
      <Text>Tipo de Serviço:</Text>
      <TextInput value={tipo} onChangeText={setTipo} />
      <Button title="Salvar Agendamento" onPress={salvar} />
    </View>
  );
}
