import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, loading } = useAuth();

  const handleSignIn = async () => {
    const { error } = await signIn(email, password);
    if (error) Alert.alert('Sign In Error', error.message);
  };

  const handleSignUp = async () => {
    const { error } = await signUp(email, password);
    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      Alert.alert('Please check your inbox for email verification!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={handleSignIn} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={handleSignUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});