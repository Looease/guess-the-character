provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "guess-the-character-app" {
  bucket = "guess-the-character-app" 

  force_destroy = true  

  tags = {
    Name = "guess-the-character-app"
  }
}

resource "aws_s3_object" "frontend-index" {
  bucket = aws_s3_bucket.guess-the-character-app.bucket
  key    = "index.html"
  source = "../client/public/index.html"
}


resource "aws_s3_bucket_policy" "guess-the-character-app-policy" {
  bucket = aws_s3_bucket.guess-the-character-app.bucket

  policy = <<-EOT
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "${aws_s3_bucket.guess-the-character-app.arn}/*"
        }
      ]
    }
  EOT
}

resource "aws_s3_bucket" "guess-the-character-server" {
  bucket = "guess-the-character-server"

  force_destroy = true  

  tags = {
    Name = "guess-the-character-server"
  }
}

resource "aws_s3_object" "server-index" {
  bucket = aws_s3_bucket.guess-the-character-server.bucket
  key    = "index.html"
  source = "../server/dist/index.html"
}

resource "aws_s3_bucket_policy" "guess-the-character-server" {
  bucket = aws_s3_bucket.guess-the-character-server.bucket

  policy = <<-EOT
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "${aws_s3_bucket.guess-the-character-server.arn}/*"
        }
      ]
    }
  EOT
}

output "frontend_url" {
  value = aws_s3_bucket.guess-the-character-app.bucket_domain_name
}

output "api_url" {
  value = aws_s3_bucket.guess-the-character-server.bucket_domain_name
}


