import React, { useState } from "react";
import { FlatList, View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { fetchLocations } from "../src/api/locationsApi";
import { Location } from "../src/types/locationTypes";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchResults = async (searchText: string) => {
    setLoading(true);
    if (!searchText) {
      setResults([]);
      return;
    }
    try {
      const response = await fetchLocations(searchText);
      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text === "") {
      setResults([]);
      return;
    }

    if (debounceTimeout) {
      setLoading(false);

      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchResults(text);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const clearSearch = () => {
    setResults([]);
    handleSearch("");
  };

  const SearchItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row p-4 gap-2 items-center border-b border-b-gray-200"
      onPress={() =>
        router.push({
          pathname: "/detailScreen",
          params: {
            lat: item.lat,
            long: item.long,
            display: item.display,
            country: item.country,
            state: item.state,
            city_name: item.city_name,
          },
        })
      }
    >
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
          {item.display.toUpperCase()}
        </Text>
        <Text className="text-sm text-gray-600" ellipsizeMode="tail">
          {item.city_name}
          {item.state ? `, ${item.state}` : ""}
          {item.country ? `, ${item.country}` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 p-4 bg-white">
        <View className="mb-4">
          <Searchbar
            autoFocus
            style={styles.searchBar}
            placeholder="Buscar ciudad..."
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
            loading={loading}
            onClearIconPress={clearSearch}
            iconColor="#666"
            placeholderTextColor="#666"
            inputStyle={styles.searchInput}
          />
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#666" />
            <Text className="mt-4 text-gray-600">Buscando ciudades...</Text>
          </View>
        ) : (
          <>
            {results.length === 0 && query !== "" ? (
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-600 text-center">
                  No se encontraron ciudades con ese nombre
                </Text>
              </View>
            ) : null}
          </>
        )}

        <FlatList
          className="w-full"
          data={results}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Location }) => (
            <SearchItem item={item} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#f5f5f5",
    elevation: 0,
    borderRadius: 12,
    shadowColor: "transparent",
  },
  searchInput: {
    fontSize: 16,
  },
  listContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    overflow: "hidden",
  },
});
