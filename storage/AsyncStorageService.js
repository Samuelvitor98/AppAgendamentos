import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
  salvarItem: async (chave, valor) => {
    try {
      const jsonValue = JSON.stringify(valor);
      await AsyncStorage.setItem(chave, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar', e);
    }
  },

  buscarItem: async (chave) => {
    try {
      const jsonValue = await AsyncStorage.getItem(chave);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Erro ao buscar', e);
    }
  },

  removerItem: async (chave) => {
    try {
      await AsyncStorage.removeItem(chave);
    } catch (e) {
      console.error('Erro ao remover', e);
    }
  },

  limparTudo: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Erro ao limpar', e);
    }
  }
};

export default AsyncStorageService;
