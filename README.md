# The Gilded Road
### Dynamic Regional Economy for Skyrim SE

> *"Gold isn't found in mines, traveler. It's found on the road."* 
> - Gaius Platorius, Imperial Trade Census

**The Gilded Road** is a lightweight, script-free economy overhaul that transforms Skyrim's static merchants into a dynamic regional trading simulation. By leveraging **Keyword Item Distributor (KID)**, this mod assigns "Surplus" and "Deficit" traits to items based on the geography, culture, and industry of each Hold.

No longer is a sword worth the same in a mine as it is in a palace. A sack of flour costs a fortune in the frozen north, while ebony is practically free near the mines of Eastmarch.

---

## 🌟 Key Features

* **Regional Pricing:** Every Hold has a unique economic identity. Buy Silver in Markarth (Surplus) and sell it in Solitude (Deficit) for massive profit.
* **Lore-Accurate Scarcity:**
    * **The Freeze:** Fuel (Firewood) and warmth (Furs) are life-or-death necessities in Winterhold and Dawnstar, commanding extreme prices.
    * **The Starvation:** In the frozen wastes of the Pale and Winterhold, fresh vegetables and bread are rare, imported luxuries.
    * **The War Machine:** Weapons and heavy armor are abundant and cheap in Windhelm due to the proximity of the Gloombound Mine and the war effort.
* **"Hardcore" Stacking Logic:** Multipliers stack. If an item is a *Global Deficit* (1.5x) AND a *Specific Necessity* (1.5x), you will feel the burn of a **2.25x** price hike.
* **Zero Script Bloat:** The mod runs **zero** background scripts. All logic is handled natively by KID at game load, ensuring maximum performance and save-game safety.
* **Hybrid Compatibility:** Works out of the box with vanilla items and automatically detects modded items if **Object Categorization Framework (OCF)** is installed.

---

## 🗺️ The Economy at a Glance

Each hold defines items as **Surplus (Cheap)** or **Deficit (Expensive)**.

| Hold | Surplus (Buy Here) | Deficit (Sell Here) | The "Gilded" Run |
| :--- | :--- | :--- | :--- |
| **Whiterun** | Leather, Crops, Basic Gear | Ebony, Spices, Jewelry | *The Breadbasket Run* |
| **Markarth** | Silver, Gold, Dwarven Metal | Food, Wood, Alcohol | *The Silver Road* |
| **Riften** | Mead, Fish, Light Armor | Heavy Armor, Iron, Salt | *The Black-Briar Run* |
| **Solitude** | Luxury Clothes, Jewelry, Wine | Ores, Ingots, Furs | *The Imperial Import* |
| **Windhelm** | Ebony, Weapons, Horker Meat | Crops, Wood, Fabrics | *The War Profiteer* |
| **Winterhold** | Soul Gems, Spell Tomes | **Food**, **Wood**, **Survival** | *The Relief Convoy* |
| **Dawnstar** | Iron, Quicksilver, Salt | Warm Clothing, Vegetables | *The Miner's Exchange* |

[Image of a trade route map of Skyrim showing flow of goods between holds]

---

## ⚙️ How It Works

The mod uses `JSON` configuration files to apply price multipliers based on location-specific keywords.

**Example: The "Silver Run"**
1.  **In Markarth:** The *Silver-Blood Monopoly* rule applies `0.6x Buy` / `0.3x Sell` to Silver Ingots. You buy them for pennies.
2.  **On the Road:** You travel to Solitude.
3.  **In Solitude:** The *Noble Materials* rule applies `1.3x Buy` / `1.15x
