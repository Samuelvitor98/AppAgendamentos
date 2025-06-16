import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProprietarioScreen() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const dados = await AsyncStorage.getItem('agendamentos');
        const lista = dados ? JSON.parse(dados) : [];
        setAgendamentos(lista);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os agendamentos.');
      }
    };

    const unsubscribe = carregarAgendamentos();
    return () => unsubscribe;
  }, []);

  const limparAgendamentos = async () => {
    try {
      await AsyncStorage.removeItem('agendamentos');
      setAgendamentos([]);
      Alert.alert('Sucesso', 'Todos os agendamentos foram apagados.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos - Studio VL</Text>

      {agendamentos.length === 0 ? (
        <Text style={styles.noData}>Nenhum agendamento encontrado.</Text>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>Cliente: {item.nome}</Text>
              <Text style={styles.cardText}>Data: {item.data}</Text>
              <Text style={styles.cardText}>Hora: {item.hora}</Text>
              <Text style={styles.cardText}>Serviço: {item.servico}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={limparAgendamentos}>
        <Text style={styles.buttonText}>Limpar Todos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdf6f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#8e44ad', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  cardText: { fontSize: 16, color: '#333' },
  button: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  noData: { textAlign: 'center', color: '#999', marginTop: 20 },
});

