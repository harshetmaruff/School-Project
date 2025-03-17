use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String, // User ID
    exp: usize,  // Expiration time
}

// Load secret key from environment variable (or fallback)
fn get_secret() -> Vec<u8> {
    env::var("JWT_SECRET").unwrap_or_else(|_| "super_secret_key".to_string()).into_bytes()
}

// Generate JWT token
pub fn create_jwt(user_id: &str) -> String {
    let expiration = SystemTime::now()
  
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() + 3600; // 1 hour expiry

    let claims = Claims { sub: user_id.to_string(), exp: expiration as usize };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(&get_secret())).unwrap()
}

// Verify JWT token
pub fn verify_jwt(token: &str) -> bool {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(&get_secret()),
        &Validation::default(),
    ).is_ok()
}