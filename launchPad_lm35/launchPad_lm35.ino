void setup() {
  // put your setup code here, to run once:
     Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead (A3);
  float voltaje = sensorValue * (3.0 / 1023.0);
  Serial.println(voltaje);
  delay(500);
}
