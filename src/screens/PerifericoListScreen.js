import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { getPerifericosByComputador, deletePeriferico } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const PerifericoListScreen = ({ route, navigation }) => {
  const { computadorId, computadorNome } = route.params;
  const [perifericos, setPerifericos] = useState([]);

  const fetchPerifericos = async () => {
    try {
      const response = await getPerifericosByComputador(computadorId);
      setPerifericos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os periféricos.");
    }
  };

  useFocusEffect(React.useCallback(() => { fetchPerifericos(); }, [computadorId]));

  const handleDelete = (id) => {
    
    Alert.alert("Confirmar", "Deseja deletar este periférico?", [
      { text: "Cancelar" },
      { text: "Deletar", onPress: async () => {
          try {
            await deletePeriferico(id);
            fetchPerifericos();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível deletar.");
          }
      }}
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Editar" onPress={() => navigation.navigate('PerifericoForm', { id: item.id, computadorId: computadorId })} />
        <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Periféricos de: {computadorNome}</Text>
      <Button 
        title="Adicionar Novo Periférico" 
        onPress={() => navigation.navigate('PerifericoForm', { computadorId: computadorId })} 
      />
      <FlatList
        data={perifericos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemTitle: { fontSize: 18, flex: 1 },
    buttonsContainer: { flexDirection: 'row', gap: 5 }
});


export default PerifericoListScreen;