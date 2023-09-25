import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Buttons = ({ text, onPress }) => {

  return (
    <TouchableOpacity style={styles.buttons} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 2,
  },
});
