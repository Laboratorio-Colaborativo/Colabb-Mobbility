import 'package:amplify_flutter/amplify_flutter.dart';

class AuthService {
  Future<SignUpResult> signUp(String email, String password) async {
    try {
      final result = await Amplify.Auth.signUp(
        username: email,
        password: password,
      );
      return result;
    } on AuthException catch (e) {
      throw e.message;
    }
  }

  Future<bool> confirmSignUp(String email, String confirmationCode) async {
    try {
      final result = await Amplify.Auth.confirmSignUp(
        username: email,
        confirmationCode: confirmationCode,
      );
      return result.isSignUpComplete;
    } on AuthException catch (e) {
      throw e.message;
    }
  }

  Future<void> signIn(String email, String password) async {
    try {
      final result = await Amplify.Auth.signIn(
        username: email,
        password: password,
      );
      if (result.isSignedIn) {
        // User is signed in
      }
    } on AuthException catch (e) {
      throw e.message;
    }
  }

  Future<void> signOut() async {
    try {
      await Amplify.Auth.signOut();
    } on AuthException catch (e) {
      throw e.message;
    }
  }

  Future<bool> isUserSignedIn() async {
    try {
      final result = await Amplify.Auth.fetchAuthSession();
      return result.isSignedIn;
    } catch (e) {
      return false;
    }
  }
}
