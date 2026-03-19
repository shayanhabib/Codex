# LoopUp API Examples

## Auth
### Register
`POST /api/auth/register`
```json
{
  "name": "Lena",
  "username": "lena",
  "email": "lena@example.com",
  "password": "Password123!"
}
```

### Login
`POST /api/auth/login`
```json
{
  "email": "lena@example.com",
  "password": "Password123!"
}
```

## Social
### Create post
`POST /api/posts` (Bearer token)
```json
{
  "type": "TEXT",
  "text": "My first post",
  "caption": "vibes",
  "visibility": "PUBLIC"
}
```

### Toggle like
`POST /api/posts/{postId}/like`

## Wallet / Rewards
### Wallet history
`GET /api/wallet/history`

### Rewarded ad bonus
`POST /api/wallet/rewarded-ad`

### Claim daily streak
`POST /api/streaks/claim`

### Lucky spin
`POST /api/spin`
```json
{ "paidSpin": false }
```

## Games
### Submit game score
`POST /api/games/submit`
```json
{
  "gameType": "TAP_RUSH",
  "score": 350,
  "accuracy": 0.88
}
```

## Shop
### List items
`GET /api/shop`

### Purchase item
`POST /api/shop/purchase`
```json
{ "code": "spin_ticket" }
```

### Boost post
`POST /api/shop/boost`
```json
{ "postId": "cuid_post_id", "durationHours": 24 }
```

## Premium
### List plans
`GET /api/premium/plans`

### Subscribe
`POST /api/premium/subscribe`
```json
{ "planCode": "pro_monthly" }
```

## Referral
### Apply referral code
`POST /api/referrals/apply`
```json
{ "code": "DEMO01" }
```

## Admin
### Monetization stats
`GET /api/admin/stats`
