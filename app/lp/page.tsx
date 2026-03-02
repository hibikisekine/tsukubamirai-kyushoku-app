"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import "./lp.css";

const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeFBIerKq2kOfuSsmCAbmquAXU1DVQgEehqjvyr3yhQ6xvmLw/viewform?usp=dialog";

export default function LandingPage() {
    useEffect(() => {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const targetHref = anchor.getAttribute("href");
                if (
                    !targetHref ||
                    targetHref === "#" ||
                    targetHref.startsWith("http") ||
                    targetHref.startsWith("mailto")
                )
                    return;
                e.preventDefault();
                const targetElement = document.querySelector(targetHref);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            });
        });

        // Navbar scroll behavior
        const navbar = document.getElementById("lp-navbar");
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar?.classList.add("scrolled");
            } else {
                navbar?.classList.remove("scrolled");
            }

            // Reveal effect
            const revealElements = document.querySelectorAll(
                ".about-card, .feature-content, .step-item"
            );
            const windowHeight = window.innerHeight;
            revealElements.forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    (el as HTMLElement).style.opacity = "1";
                    (el as HTMLElement).style.transform = "translateY(0)";
                }
            });
        };

        // Initial setup for reveal
        const revealElements = document.querySelectorAll(
            ".about-card, .feature-content, .step-item"
        );
        revealElements.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateY(30px)";
            (el as HTMLElement).style.transition = "all 0.6s ease-out";
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById("lp-mobile-menu");
        const navLinks = document.querySelector(".lp-body .nav-links");
        mobileMenu?.addEventListener("click", () => {
            navLinks?.classList.toggle("active");
        });

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="lp-body">
            {/* Navbar */}
            <nav id="lp-navbar">
                <div className="container nav-content">
                    <div className="logo">
                        <span className="icon">🍱</span>
                        <span className="text">きゅうしょくなにかな</span>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <a href="#lp-about">サービスについて</a>
                        </li>
                        <li>
                            <a href="#lp-features">機能</a>
                        </li>
                        <li>
                            <a href="#lp-howto">使い方</a>
                        </li>
                        <li>
                            <a
                                href={googleFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-sm"
                            >
                                お問い合わせ
                            </a>
                        </li>
                    </ul>
                    <div className="menu-toggle" id="lp-mobile-menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="lp-hero">
                <div className="container hero-grid">
                    <div className="hero-text">
                        <h1 className="fade-in">
                            今日の給食、
                            <br />
                            <span className="highlight">なにかな？</span>
                        </h1>
                        <p className="subtitle fade-in-delay">
                            「PDFが見づらい」「献立表をなくした」
                            <br />
                            そんな悩みを解決。スマホでサクッと給食チェック。
                        </p>
                        <div className="hero-btns fade-in-delay-2">
                            <a href="#lp-about" className="btn-primary">
                                詳しく知る
                            </a>
                            <a
                                href={googleFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                導入のお問い合わせ
                            </a>
                        </div>
                    </div>
                    <div className="hero-image-container fade-in">
                        <img
                            src="/lp-hero.png"
                            alt="おいしい給食のイメージ"
                            className="floating"
                        />
                        <div className="blob-bg"></div>
                    </div>
                </div>
            </header>

            {/* About Section */}
            <section id="lp-about">
                <div className="container">
                    <div className="section-badge">ABOUT</div>
                    <h2 className="section-title">給食の「困った」を解決します</h2>
                    <div className="about-grid">
                        <div className="about-card">
                            <div className="card-icon">📄</div>
                            <h3>PDFをデータ化して提供</h3>
                            <p>
                                自治体が公開する献立PDFを抽出し、正確なデータとしてスマホ向けに配信。保護者の閲覧利便性を最大化します。
                            </p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">🤝</div>
                            <h3>自治体・学校を支援</h3>
                            <p>
                                Webサイトへの掲載から配信までを一括サポート。担当者様の運用負荷を軽減し、より良い情報提供を実現します。
                            </p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">🍎</div>
                            <h3>アレルギー・食育に貢献</h3>
                            <p>
                                見やすいUIでアレルギー情報の確認を容易に。家庭での食育を支え、学校と家庭の橋渡しを担います。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="lp-features" className="bg-light">
                <div className="container feature-row">
                    <div className="feature-img">
                        <div className="mockup-container">
                            <img
                                src="/lp-app-preview.png"
                                alt="アプリのプレビュー画面"
                                className="app-screenshot"
                            />
                        </div>
                    </div>
                    <div className="feature-content">
                        <div className="section-badge">FEATURES</div>
                        <h2 className="section-title">シンプル、だけど強力。</h2>
                        <ul className="feature-list">
                            <li>
                                <strong>スマホで見やすいカード表示</strong>
                                <p>
                                    一目で今日のメニューがわかるデザイン。拡大・縮小の必要はありません。
                                </p>
                            </li>
                            <li>
                                <strong>PDFが自動でデータ化</strong>
                                <p>
                                    献立表をアップロードするだけで、AIが自動で読み取り。手入力の手間はゼロです。
                                </p>
                            </li>
                            <li>
                                <strong>家族で共有できる</strong>
                                <p>
                                    URLひとつで家族みんなと共有。今夜の献立相談もスムーズに。
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How To Section */}
            <section id="lp-howto">
                <div className="container text-center">
                    <div className="section-badge">HOW TO USE</div>
                    <h2 className="section-title">使い方はたったの3ステップ</h2>
                    <div className="step-grid">
                        <div className="step-item">
                            <div className="step-num">01</div>
                            <p>学校から配布される献立PDFを用意します。</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-item">
                            <div className="step-num">02</div>
                            <p>ツールにPDFをアップロードします。</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-item">
                            <div className="step-num">03</div>
                            <p>あなたのスマホが最新の献立表に早変わり！</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="lp-cta">
                <div className="container cta-box">
                    <h2>自治体のDXを、給食から。</h2>
                    <p>システムの導入から運用まで、すべてお任せください。</p>
                    <a
                        href={googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-white"
                    >
                        導入の相談をする
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="logo">
                            <span className="icon">🍱</span>
                            <span className="text" style={{ color: "white" }}>
                                きゅうしょくなにかな
                            </span>
                        </div>
                        <ul className="footer-links">
                            <li>
                                <a href="/privacy">プライバシーポリシー</a>
                            </li>
                            <li>
                                <a href="/terms">利用規約</a>
                            </li>
                            <li>
                                <a
                                    href={googleFormUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    お問い合わせ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="copyright">
                        © 2026 きゅうしょくなにかな Project. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
