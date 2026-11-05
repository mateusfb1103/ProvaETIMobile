import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { getComputadores, deleteComputador } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const ComputadorListScreen = ({ navigation }) => {
  const [computadores, setComputadores] = useState([]);

  const fetchComputadores = async () => {
    try {
      const response = await getComputadores();
      setComputadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar computadores:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de computadores.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchComputadores();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar este computador?",
      [
        { text: "Cancelar" },
        { 
          text: "Deletar", 
          onPress: async () => {
            try {
              await deleteComputador(id);
              Alert.alert("Sucesso", "Computador deletado.");
              fetchComputadores(); // Atualiza a lista
            } catch (error) {
              console.error("Erro ao deletar:", error);
              Alert.alert("Erro", "Não foi possível deletar o computador.");
            }
          },
          style: "destructive" 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.nome}</Text>
        <Text>Cor: {item.cor} | Ano: {item.dataFabricacao}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Periféricos" onPress={() => navigation.navigate('PerifericoList', { computadorId: item.id, computadorNome: item.nome })} />
        <Button title="Editar" onPress={() => navigation.navigate('ComputadorForm', { id: item.id })} />
        <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar Novo Computador" 
        onPress={() => navigation.navigate('ComputadorForm')} 
      />
      <FlatList
        data={computadores}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    itemContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemTextContainer: { flex: 1 },
    itemTitle: { fontSize: 18, fontWeight: 'bold' },
    buttonsContainer: { flexDirection: 'row', gap: 5, marginTop: 10, justifyContent: 'flex-end' }
});

export default ComputadorListScreen;