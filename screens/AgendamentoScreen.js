import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendamentoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servico, setServico] = useState('');

  const handleAgendar = async () => {
    if (nome && data && hora && servico) {
      const novoAgendamento = { nome, data, hora, servico };
      try {
        const dadosSalvos = await AsyncStorage.getItem('agendamentos');
        const agendamentos = dadosSalvos ? JSON.parse(dadosSalvos) : [];
        agendamentos.push(novoAgendamento);
        await AsyncStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        Alert.alert('Sucesso', 'Agendamento realizado!');
        setNome('');
        setData('');
        setHora('');
        setServico('');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
      }
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agendar Serviço</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Cliente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex.: 10/07/2025)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (ex.: 14:00)"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Serviço (Cílios, Sobrancelha ou Manutenção)"
        value={servico}
        onChangeText={setServico}
      />

      <TouchableOpacity style={styles.button} onPress={handleAgendar}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fdf6f9' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#8e44ad', textAlign: 'center', marginBottom: 25 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#8e44ad', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

