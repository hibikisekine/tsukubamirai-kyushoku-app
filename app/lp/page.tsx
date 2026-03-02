"use client";

import { useEffect } from "react";
import "./lp.css";

const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeFBIerKq2kOfuSsmCAbmquAXU1DVQgEehqjvyr3yhQ6xvmLw/viewform?usp=dialog";

export default function LandingPage() {
    useEffect(() => {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const targetHref = anchor.getAttribute("href");
                if (!targetHref || targetHref === "#") return;
                e.preventDefault();
                const el = document.querySelector(targetHref);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            });
        });

        // Navbar scroll
        const navbar = document.getElementById("lp-navbar");
        const handleScroll = () => {
            if (window.scrollY > 50) navbar?.classList.add("scrolled");
            else navbar?.classList.remove("scrolled");

            // Reveal
            document.querySelectorAll(".reveal").forEach((el) => {
                if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                    el.classList.add("visible");
                }
            });
        };

        // Mobile menu
        const mobileMenu = document.getElementById("lp-mobile-menu");
        const navLinks = document.querySelector("#lp-navbar .nav-links") as HTMLElement | null;
        mobileMenu?.addEventListener("click", () => {
            navLinks?.classList.toggle("open");
        });

        // FAQ accordion
        document.querySelectorAll(".faq-question").forEach((btn) => {
            btn.addEventListener("click", () => {
                const item = btn.closest(".faq-item");
                item?.classList.toggle("open");
            });
        });

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const faqs = [
        {
            q: "導入するには何が必要ですか？",
            a: "自治体様で献立をインターネット上に公開されていれば、そのデータを元にアプリにデータを連携します。インターネット上にデータがない場合でも、ご相談いただければ対応いたします。",
        },
        {
            q: "専門の知識がなく不安です",
            a: "データの入稿もこちらで行いますので問題ありません。自治体様はQRコードやURLを学校にお知らせいただくだけで運用開始できます。",
        },
        {
            q: "アプリのインストールは必要ですか？",
            a: "不要です。スマートフォンやタブレットがあればご覧いただけます。また、広告は表示しませんので学校支給のタブレット等でも安心してご利用いただけます。",
        },
        {
            q: "デモを見ることはできますか？",
            a: "はい、可能です。オンラインでのご説明や、ご担当者様への説明の時間をいただければと思います。お問い合わせからご連絡ください。",
        },
        {
            q: "1つの自治体に複数の給食センターがあり、献立が異なる場合も対応できますか？",
            a: "可能です。例えばA地区・B地区などわけて表示することができます。",
        },
        {
            q: "広告は表示されますか？",
            a: "「きゅうしょくなにかな」のアプリ／Webサイトに広告は表示いたしません。お子さまでも安心してご覧いただけます。",
        },
    ];

    return (
        <div className="lp-body">
            {/* Navbar */}
            <nav id="lp-navbar">
                <div className="lp-container lp-nav-content">
                    <div className="lp-logo">
                        <span>🍱</span>
                        <span>きゅうしょくなにかな</span>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#lp-features">サービス特徴</a></li>
                        <li><a href="#lp-faq">よくある質問</a></li>
                        <li><a href="#lp-pricing">料金</a></li>
                        <li>
                            <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="lp-btn-sm">
                                お問い合わせ
                            </a>
                        </li>
                    </ul>
                    <button className="lp-hamburger" id="lp-mobile-menu" aria-label="メニュー">
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="lp-hero">
                <div className="lp-container">
                    <div className="lp-hero-badge">自治体・学校向けサービス</div>
                    <h1 className="lp-hero-title">
                        おまかせ運用で
                        <br />
                        <span className="lp-accent">自治体の給食献立を</span>
                        <br />
                        アプリ化。
                    </h1>
                    <p className="lp-hero-sub">
                        自治体様の面倒な作業はゼロ。すべておまかせで献立のペーパーレスを実現し、
                        <br className="pc-only" />
                        SDGs推進にも貢献します。
                    </p>
                    <div className="lp-hero-btns">
                        <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="lp-btn-primary">
                            無料でお問い合わせ
                        </a>
                        <a href="#lp-features" className="lp-btn-outline">
                            サービス詳細を見る
                        </a>
                    </div>
                    <div className="lp-hero-stats">
                        <div className="lp-stat">
                            <span className="lp-stat-num">0</span>
                            <span className="lp-stat-label">自治体側の作業コスト</span>
                        </div>
                        <div className="lp-stat-divider" />
                        <div className="lp-stat">
                            <span className="lp-stat-num">∞</span>
                            <span className="lp-stat-label">対応できる学校・センター数</span>
                        </div>
                        <div className="lp-stat-divider" />
                        <div className="lp-stat">
                            <span className="lp-stat-num">広告なし</span>
                            <span className="lp-stat-label">子どもたちも安心</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Features */}
            <section id="lp-features" className="lp-section lp-section-gray">
                <div className="lp-container">
                    <div className="lp-section-header">
                        <span className="lp-section-badge">SERVICE</span>
                        <h2 className="lp-section-title">選ばれる3つの理由</h2>
                    </div>
                    <div className="lp-features-grid">
                        {/* 01 */}
                        <div className="lp-feature-card reveal">
                            <div className="lp-feature-num">01</div>
                            <div className="lp-feature-icon">🤝</div>
                            <h3>おまかせ運用</h3>
                            <p>
                                自治体様の給食センターのメニューから連携します。
                                役所や給食センターの皆様の負荷が増えることはありません。
                            </p>
                            <div className="lp-feature-note">
                                ※定期的に（月1度）翌月の給食データを自治体様からご提供いただく必要があります
                            </div>
                        </div>
                        {/* 02 */}
                        <div className="lp-feature-card reveal">
                            <div className="lp-feature-num">02</div>
                            <div className="lp-feature-icon">🌱</div>
                            <h3>SDGs推進</h3>
                            <p>
                                近年のSDGs推進で学校関連の配布物のペーパーレスは急務となっています。
                                児童・保護者がSDGs意識を手軽に実感できます。
                            </p>
                        </div>
                        {/* 03 */}
                        <div className="lp-feature-card reveal">
                            <div className="lp-feature-num">03</div>
                            <div className="lp-feature-icon">🗺️</div>
                            <h3>地区ごとの切り替えも簡単</h3>
                            <p>
                                給食センターが複数ある自治体でも面倒な作業はありません。
                                献立データを公開している自治体様であればすぐに導入できます。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Preview */}
            <section className="lp-section">
                <div className="lp-container lp-demo-row">
                    <div className="lp-demo-img reveal">
                        <img src="/lp-app-preview.png" alt="きゅうしょくなにかな アプリ画面" />
                    </div>
                    <div className="lp-demo-text reveal">
                        <span className="lp-section-badge">APP</span>
                        <h2 className="lp-section-title">実際のページをご覧ください</h2>
                        <p>現在つくばみらい市で稼働中のライブデモをご確認いただけます。スマートフォンで見やすいシンプルなデザインで、保護者の方に喜ばれています。</p>
                        <ul className="lp-check-list">
                            <li>📱 スマホ・タブレット対応</li>
                            <li>🚫 広告表示なし</li>
                            <li>🔍 メニュー名での検索機能</li>
                            <li>📅 カレンダー形式での月表示</li>
                            <li>⚡ A献立・B献立の切り替え</li>
                        </ul>
                        <a href="https://kyushoku.site" target="_blank" rel="noopener noreferrer" className="lp-btn-primary">
                            デモサイトを見る →
                        </a>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="lp-pricing" className="lp-section lp-section-gray">
                <div className="lp-container">
                    <div className="lp-section-header">
                        <span className="lp-section-badge">PRICING</span>
                        <h2 className="lp-section-title">料金について</h2>
                    </div>
                    <div className="lp-pricing-card reveal">
                        <div className="lp-pricing-label">導入・月額費用</div>
                        <div className="lp-pricing-value">お問い合わせください</div>
                        <p className="lp-pricing-note">給食センター数（献立数）によって変動します。</p>
                        <ul className="lp-pricing-includes">
                            <li>✅ 月1回の献立データ更新作業費用を含む</li>
                            <li>✅ 初期設定・導入サポート込み</li>
                            <li>✅ 広告なしの安心環境</li>
                            <li>✅ 複数センター・地区対応</li>
                        </ul>
                        <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="lp-btn-primary">
                            料金を問い合わせる
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="lp-faq" className="lp-section">
                <div className="lp-container">
                    <div className="lp-section-header">
                        <span className="lp-section-badge">FAQ</span>
                        <h2 className="lp-section-title">よくあるご質問</h2>
                    </div>
                    <div className="lp-faq-list">
                        {faqs.map((faq, i) => (
                            <div className="faq-item reveal" key={i}>
                                <button className="faq-question">
                                    <span className="faq-q-label">Q</span>
                                    <span>{faq.q}</span>
                                    <span className="faq-arrow">▼</span>
                                </button>
                                <div className="faq-answer">
                                    <span className="faq-a-label">A</span>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="lp-cta-section">
                <div className="lp-container lp-cta-inner">
                    <h2>自治体のDXを、給食から。</h2>
                    <p>導入のご相談・デモのご依頼は、お気軽にお問い合わせください。</p>
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="lp-btn-white">
                        無料でお問い合わせ
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="lp-footer">
                <div className="lp-container lp-footer-inner">
                    <div className="lp-logo lp-logo-white">
                        <span>🍱</span>
                        <span>きゅうしょくなにかな</span>
                    </div>
                    <ul className="lp-footer-links">
                        <li><a href="/privacy">プライバシーポリシー</a></li>
                        <li><a href="/terms">利用規約</a></li>
                        <li><a href={googleFormUrl} target="_blank" rel="noopener noreferrer">お問い合わせ</a></li>
                    </ul>
                </div>
                <p className="lp-copyright">© 2026 きゅうしょくなにかな Project. All rights reserved.</p>
            </footer>
        </div>
    );
}
